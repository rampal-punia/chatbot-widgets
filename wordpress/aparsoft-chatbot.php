<?php
/**
 * Plugin Name: Aparsoft AI Chatbot
 * Plugin URI:  https://aparsoft.com
 * Description: Add an AI-powered chatbot to your WordPress site. Trained on your content.
 *              Includes 50 free messages per month. No coding required.
 * Version:     1.0.0
 * Author:      Aparsoft Private Limited
 * Author URI:  https://aparsoft.com
 * License:     GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: aparsoft-chatbot
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'APARSOFT_CHATBOT_VERSION', '1.0.0' );
define( 'APARSOFT_CHATBOT_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'APARSOFT_CHATBOT_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

// Load includes
require_once APARSOFT_CHATBOT_PLUGIN_DIR . 'includes/class-settings.php';
require_once APARSOFT_CHATBOT_PLUGIN_DIR . 'includes/class-script-injector.php';

// Bootstrap
add_action( 'plugins_loaded', 'aparsoft_chatbot_init' );
function aparsoft_chatbot_init() {
    // Initialize settings page
    if ( is_admin() ) {
        new Aparsoft_Chatbot_Settings();
    }
    // Initialize script injection
    new Aparsoft_Chatbot_Script_Injector();
}

// Activation hook
register_activation_hook( __FILE__, 'aparsoft_chatbot_activate' );
function aparsoft_chatbot_activate() {
    // Set default options
    $defaults = array(
        'aparsoft_widget_id'       => '',
        'aparsoft_position'        => 'bottom-right',
        'aparsoft_show_branding'   => true,
        'aparsoft_primary_color'   => '',
        'aparsoft_secondary_color' => '',
        'aparsoft_enabled'         => true,
    );
    foreach ( $defaults as $key => $value ) {
        if ( false === get_option( $key ) ) {
            add_option( $key, $value );
        }
    }
}
