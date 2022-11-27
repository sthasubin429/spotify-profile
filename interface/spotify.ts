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
