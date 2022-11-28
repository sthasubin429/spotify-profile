// Type definitions for The Spotify Web API (including changes March 29th 2016)
// Project: https://developer.spotify.com/web-api/
// Definitions by: Niels Kristian Hansen Skovmand <https://github.com/skovmand>
//                 Magnar Ovedal Myrtveit <https://github.com/Stadly>
//                 Nils Måsén <https://github.com/piksel>
//                 Basti Ortiz <https://github.com/Some-Dood>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

// Release comments:
// -----------------

// The audio analysis object is not yet in the Object Model at Spotify, therefore it is typed as any in this file.

// TrackObjects and AlbumObjects is specified in the docs as always having the available_markets property,
// but when it is sent in https://developer.spotify.com/web-api/console/get-current-user-saved-tracks
// the available_markets are missing. Therefore it is marked as optional in this source code.

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/spotify-api/index.d.ts
// Used necessary type definitions from above link.

// Exported interface at top.

/**
 * Get Current User’s Profile
 *
 * GET /v1/me
 * https://developer.spotify.com/web-api/get-current-users-profile/
 */
export interface CurrentUsersProfileResponse extends UserObjectPrivate {}

/**
 * Get User’s Followed Artists
 *
 * GET /v1/me/following
 * https://developer.spotify.com/web-api/get-followed-artists/
 */
export interface UsersFollowedArtistsResponse {
  artists: CursorBasedPagingObject<ArtistObjectFull>;
}

/**
 * Get a User’s Recently Played Tracks
 *
 * GET /v1/me/player/recently-played
 * https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/
 */
export interface UsersRecentlyPlayedTracksResponse
  extends CursorBasedPagingObject<PlayHistoryObject> {}

/**
 * Play History Object
 * [](https://developer.spotify.com/web-api/web-api-personalization-endpoints/get-recently-played/#play-history-object)
 */
export interface PlayHistoryObject {
  track: TrackObjectFull;
  played_at: string;
  context: ContextObject;
}

/**
 * Full Track Object
 * [track object (full)](https://developer.spotify.com/web-api/object-model/#track-object-full)
 */
export interface TrackObjectFull extends TrackObjectSimplified {
  /**
   * The album on which the track appears.
   */
  album: AlbumObjectSimplified;
  /**
   * Known external IDs for the track.
   */
  external_ids: ExternalIdObject;
  /**
   * The popularity of the track. The value will be between `0` and `100`, with `100` being the most popular.
   * The popularity of a track is a value between `0` and `100`, with `100` being the most popular.
   * The popularity is calculated by algorithm and is based, in the most part,
   * on the total number of plays the track has had and how recent those plays are.
   */
  popularity: number;
  /**
   * Whether or not the track is from a local file.
   */
  is_local?: boolean | undefined;
}

/**
 * Simplified Track Object
 * [track object (simplified)](https://developer.spotify.com/web-api/object-model/#track-object-simplified)
 */
interface TrackObjectSimplified {
  /**
   * The artists who performed the track.
   */
  artists: ArtistObjectSimplified[];
  /**
   * A list of the countries in which the track can be played,
   * identified by their [ISO 3166-1 alpha-2 code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
   */
  available_markets?: string[] | undefined;
  /**
   * The disc number (usually `1` unless the album consists of more than one disc).
   */
  disc_number: number;
  /**
   * The track length in milliseconds.
   */
  duration_ms: number;
  /**
   * Whether or not the track has explicit lyrics (`true` = yes it does; `false` = no it does not OR unknown).
   */
  explicit: boolean;
  /**
   * Known external URLs for this track.
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the track.
   */
  href: string;
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
   */
  id: string;
  /**
   * Part of the response when [Track Relinking]
   * (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/) is applied.
   * If `true`, the track is playable in the given market. Otherwise, `false`.
   */
  is_playable?: boolean | undefined;
  /**
   * Part of the response when [Track Relinking]
   * (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/) is applied,
   * and the requested track has been replaced with different track.
   * The track in the `linked_from` object contains information about the originally requested track.
   */
  linked_from?: TrackLinkObject | undefined;
  /**
   * Part of the response when [Track Relinking]
   * (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/) is applied,
   * the original track is not available in the given market, and Spotify did not have any tracks to relink it with.
   * The track response will still contain metadata for the original track, and a restrictions object containing the reason
   * why the track is not available: `"restrictions" : {"reason" : "market"}`.
   */
  restrictions?: RestrictionsObject | undefined;
  /**
   * The name of the track.
   */
  name: string;
  /**
   * A link to a 30 second preview (MP3 format) of the track. Can be null
   */
  preview_url: string | null;
  /**
   * The number of the track. If an album has several discs, the track number is the number on the specified disc.
   */
  track_number: number;
  /**
   * The object type: “track”.
   */
  type: 'track';
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
   */
  uri: string;
}

/**
 * External Id object
 * [](https://developer.spotify.com/web-api/object-model/)
 *
 * Note that there might be other types available, it couldn't be found in the docs.
 */
interface ExternalIdObject {
  isrc?: string | undefined;
  ean?: string | undefined;
  upc?: string | undefined;
}

/**
 * Simplified Album Object
 * [album object (simplified)](https://developer.spotify.com/web-api/object-model/#album-object-simplified)
 */
interface AlbumObjectSimplified extends ContextObject {
  /**
   * The field is present when getting an artist’s albums.
   * Possible values are “album”, “single”, “compilation”, “appears_on”.
   * Compare to album_type this field represents relationship between the artist and the album.
   */
  album_group?: 'album' | 'single' | 'compilation' | 'appears_on' | undefined;
  /**
   * The type of the album: one of “album”, “single”, or “compilation”.
   */
  album_type: 'album' | 'single' | 'compilation';
  /**
   * The artists of the album.
   * Each artist object includes a link in href to more detailed information about the artist.
   */
  artists: ArtistObjectSimplified[];
  /**
   * The markets in which the album is available: [ISO 3166-1 alpha-2 country codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
   * Note that an album is considered available in a market when at least 1 of its tracks is available in that market.
   */
  available_markets?: string[] | undefined;
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the album.
   */
  id: string;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: ImageObject[];
  /**
   * The name of the album. In case of an album takedown, the value may be an empty string.
   */
  name: string;
  /**
   * The date the album was first released, for example `1981`.
   * Depending on the precision, it might be shown as `1981-12` or `1981-12-15`.
   */
  release_date: string;
  /**
   * The precision with which release_date value is known: `year`, `month`, or `day`.
   */
  release_date_precision: 'year' | 'month' | 'day';
  /**
   * Part of the response when [Track Relinking]
   * (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/) is applied,
   * the original track is not available in the given market, and Spotify did not have any tracks to relink it with.
   * The track response will still contain metadata for the original track,
   * and a restrictions object containing the reason why the track is not available: `"restrictions" : {"reason" : "market"}`
   */
  restrictions?: RestrictionsObject | undefined;
  type: 'album';
  /**
   * The number of tracks in the album.
   */
  total_tracks: number;
}

interface RestrictionsObject {
  reason: string;
}

/**
 * Track Link Object
 * [](https://developer.spotify.com/web-api/object-model/#track-object-simplified)
 */
interface TrackLinkObject {
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  type: 'track';
  uri: string;
}

/**
 * Full Artist Object
 * [artist object (full)](https://developer.spotify.com/web-api/object-model/)
 */
interface ArtistObjectFull extends ArtistObjectSimplified {
  /**
   * Information about the followers of the artist.
   */
  followers: FollowersObject;
  /**
   * A list of the genres the artist is associated with.
   * For example: `"Prog Rock"` , `"Post-Grunge"`.
   * (If not yet classified, the array is empty.)
   */
  genres: string[];
  /**
   * Images of the artist in various sizes, widest first.
   */
  images: ImageObject[];
  /**
   * The popularity of the artist. The value will be between `0` and `100`, with `100` being the most popular.
   * The artist’s popularity is calculated from the popularity of all the artist’s tracks.
   */
  popularity: number;
}

/**
 * Simplified Artist Object
 * [artist object (simplified)](https://developer.spotify.com/web-api/object-model/)
 */
interface ArtistObjectSimplified extends ContextObject {
  /**
   * The name of the artist.
   */
  name: string;
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the artist.
   */
  id: string;
  type: 'artist';
}

/**
 * Context Object
 * [](https://developer.spotify.com/web-api/object-model/#context-object)
 */
interface ContextObject {
  /**
   * The object type.
   */
  type: 'artist' | 'playlist' | 'album' | 'show' | 'episode';
  /**
   * A link to the Web API endpoint providing full details.
   */
  href: string;
  /**
   * Known external URLs.
   */
  external_urls: ExternalUrlObject;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   */
  uri: string;
}

/**
 * Cursor Based Paging Object wrappers used for retrieving collections from the Spotify API.
 * [](https://developer.spotify.com/web-api/object-model/#cursor-based-paging-object)
 */
interface CursorBasedPagingObject<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  cursors: CursorObject;
  total?: number | undefined;
}

/**
 * Cursor object
 * [cursor object](https://developer.spotify.com/web-api/object-model/)
 */
interface CursorObject {
  after: string;
  before?: string | undefined;
}

/**
 * User Object (Private)
 * [](https://developer.spotify.com/web-api/object-model/#track-object-simplified)
 */
interface UserObjectPrivate extends UserObjectPublic {
  birthdate: string;
  country: string;
  email: string;
  product: string;
}

/**
 * User Object (Public)
 * [](https://developer.spotify.com/web-api/object-model/#track-object-simplified)
 */
interface UserObjectPublic {
  display_name?: string | undefined;
  external_urls: ExternalUrlObject;
  followers?: FollowersObject | undefined;
  href: string;
  id: string;
  images?: ImageObject[] | undefined;
  type: 'user';
  uri: string;
}

/**
 * External Url Object
 * [](https://developer.spotify.com/web-api/object-model/)
 *
 * Note that there might be other types available, it couldn't be found in the docs.
 */
interface ExternalUrlObject {
  spotify: string;
}

/**
 * Followers Object
 * [](https://developer.spotify.com/web-api/object-model/)
 */
interface FollowersObject {
  /**
   * A link to the Web API endpoint providing full details of the followers; `null` if not available.
   * Please note that this will always be set to `null`, as the Web API does not support it at the moment.
   */
  href: null;
  /**
   * The total number of followers.
   */
  total: number;
}

/**
 * Image Object
 * [](https://developer.spotify.com/web-api/object-model/)
 */
interface ImageObject {
  /**
   * The image height in pixels. If unknown: `null` or not returned.
   */
  height?: number | undefined;
  /**
   * The source URL of the image.
   */
  url: string;
  /**
   * The image width in pixels. If unknown: null or not returned.
   */
  width?: number | undefined;
}
