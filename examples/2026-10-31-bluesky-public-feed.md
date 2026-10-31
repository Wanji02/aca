# Social API case: Bluesky public feed and cursor reuse

Date: 2026-10-31. Workflow: ACA 0.2.0, unchanged during this case.

## Goal and scope

Read the public `bsky.app` account's feed, continue from saved pagination state in a new process, and handle unusable connection information without reporting stale success.

This is a second maintainer-led case with a target not preconfigured in ACA. It is not a fresh-agent, cross-model, or with/without ACA evaluation. The AI researched and implemented a small task-local Python client using the standard library. No SDK, model service, login, or ACA runtime was installed.

## Discovering the route

The old individual API documentation URLs redirected to a reference page that the reader could not extract. Two previously indexed `app.bsky` lexicon paths in `bluesky-social/atproto` returned 404. The repository's own [directory notice](https://github.com/bluesky-social/atproto/blob/d3080834ac43dbb94e97e82fdd85b1a0f12558ad/lexicons/README.md) pointed to the new canonical `bluesky-social/bsky` repository.

The assistant then consulted the official [API routing guide](https://bsky.network/docs/api-directory/), [feed definition](https://github.com/bluesky-social/bsky/blob/293d6494ed9058e28a04b97133d16ab8abe7ef5e/lexicons/app/bsky/feed/getAuthorFeed.json), and [profile definition](https://github.com/bluesky-social/bsky/blob/293d6494ed9058e28a04b97133d16ab8abe7ef5e/lexicons/app/bsky/actor/getProfile.json). It chose public, unauthenticated GET requests against `https://public.api.bsky.app/xrpc/`.

The route was: resolve the handle, check that the returned profile agrees with that identity, fetch three feed items, and cross-check one item through the individual-post lookup endpoint. A later process rechecked the identity and continued with the saved cursor. Author feeds can contain reposts, so attribution checked either the original author or the account that reposted the item.

## Observed results

| Run | Result | Run elapsed time |
| --- | --- | --- |
| Initial connection | Three records; one individual lookup matched | 2.156 s |
| New-process continuation | Three further records; lookup matched; no overlap | 3.156 s |
| Deliberately mismatched saved DID | Stopped after resolution; did not fetch the feed | 1.031 s |
| Deliberately invalid cursor | API returned HTTP 500 / InternalServerError; client reported failure | 1.765 s |
| Deliberately invalid handle | API returned HTTP 400 / InvalidRequest; no connection saved | 2.172 s |
| New process using the preserved valid state | Three further records; lookup matched; no overlap | 2.109 s |

There were 17 API requests across these six recorded runs, plus three earlier exploratory reads. The three successful pages contained nine unique post identifiers, including three reposts. Each page's sampled record matched the individual lookup by URI and CID.

The failed cursor attempt left the prior state unchanged. Recovery used that valid cursor in a fresh process; it did not retry the invalid value, return a cached page as success, or restart any service. This demonstrates recovery from a bad input, not a platform outage. The deliberately mismatched identity was not silently rebound.

Timings cover these individual client runs, not research and implementation time or a demonstrated ACA speedup. Public responses may be cached by the service; they are not proof of immediate real-time updates. No overlap occurred in this run, but live pagination can change between requests.

## Reusing the connection

The local note retains the public host, methods, handle, invocation, and known failures. The local state retains the resolved account ID, cursor, and hashes of seen record identifiers. No post bodies, images, videos, or private conversations are stored. The format was chosen for this task, not imposed by ACA.

For a minimal public-read reproduction, resolve the account first:

```sh
curl --get 'https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle' --data-urlencode 'handle=bsky.app'
```

Then query `app.bsky.actor.getProfile` with `actor` set to the returned DID, followed by `app.bsky.feed.getAuthorFeed` with that same `actor` and `limit=3`. Retain the returned cursor and supply it on the next feed request. Verify the target and the returned records rather than treating a successful HTTP response alone as completion.

## What was and was not established

The common workflow supported finding a current route after stale documentation, establishing a real social-platform read, and preserving usable state across failed attempts. Identity checks establish consistency between handle resolution and AppView responses; they are not independent cryptographic verification of the DID history.

No messages, likes, posts, account changes, private reads, or device probes were made. Authenticated actions and full social-platform interaction remain untested. This case does not establish that ACA caused better results than the same assistant without the workflow.

The experiments and client remain outside the ACA distribution. No new core instructions, connector catalog, mandatory record format, or runtime dependencies were needed.
