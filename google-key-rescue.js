/**
 * (C) Copyright 2008 Jeremy Maitin-Shepard
 * (C) Copyright 2009-2010 John J. Foerch
 *
 * Use, modification, and distribution are subject to the terms specified in the
 * COPYING file.
**/

require("content-buffer.js");


define_keymap("google_key_rescue_keymap", $display_name = "google-key-rescue");

// Keys for the "experimental" keyboard search
define_key(google_key_rescue_keymap, "j", "ensure-content-focused", $fallthrough);
define_key(google_key_rescue_keymap, "k", "ensure-content-focused", $fallthrough);
define_key(google_key_rescue_keymap, "o", "ensure-content-focused", $fallthrough);
define_key(google_key_rescue_keymap, "/", "ensure-content-focused", $fallthrough);
define_key(google_key_rescue_keymap, "return", "ensure-content-focused", $fallthrough);//BAD

/**
 * Note: escape already does the same thing as the Google key binding.
 */

define_page_mode("google-key-rescue-mode",
    build_url_regexp($domain = /(?:encrypted\.)?google/,
                     $allow_www = true,
                     $path = /search\?|cse\?/,
                     $tlds = ["com", "com.au", "co.uk", "de", "dk", "es",
                              "fr", "it", "no", "se", "uk"]),
    function enable (buffer) {

    buffer.document.addEventListener('keydown', function (e) {
    e.cancelBubble = true;
    e.stopImmediatePropagation();
    return false;
    });
    },
    function disable (buffer) {
    },
    $display_name = "Google Key Rescue");

page_mode_activate(google_key_rescue_mode);

provide("google-key-rescue");
