<?php

/**
 * Minimum number of friends that a user has to have in order qualify for a
 * feed post.
 */
define("MIN_FRIENDS_COUNT", 20);

/**
 * Minimum number of hours that have to pass before NINA will post another story
 * on the user's wall. Please note this is in hours.
 */
define("MIN_ELAPSED_TIME",  10);

/**
 * If a post made my the application does not have any comments or likes, then
 * it will be deleted within at least POST_LIFE_LENGTH hours.
 */
define("POST_LIFE_LENGTH", 0);

/**
 * Indicator of the number of hours that a post will be seen by the profiler.
 * For example if set to 48 hours, then the profiler will profile any posts made 
 * within the past 48 hours that have not yet been deleted.
 */
define("PROFILE_SPAN", 48);

/**
 * Querying size for accessing users from the database.
 */
define("QUERY_PAGE_SIZE", 5000);

/**
 * Given a post ready user, a wall post will be made with at least 
 * MIN_POST_POSIBILITY chance. So 0.4 means that at least 40% will
 * of the current post-applicable users will have a wall post.
 */
define("MIN_POST_PROBABILITY", 1);

/**
 * This is the maximum number of requests per batch sent to Facebook Graph API.
 * Defined by Facebook.
 */
define("MAX_ALLOWED_BATCH_REQUESTS", 40);

/**
 * Defines the start time of the process to be used in multipl database queries 
 * and affect the same exact rows.
 */
define("START_TIME", time());

/**
 * Defines the seed of a random operation in database queries - allows multipl 
 * database queries affect the same exact rows.
 */
define("RAND_SEED", rand(1, 100000000));


?>
