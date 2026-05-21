<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class Aparsoft_Chatbot_Settings {

    public function __construct() {
        add_action( 'admin_menu', array( $this, 'add_menu' ) );
        add_action( 'admin_init', array( $this, 'register_settings' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
    }

    public function add_menu() {
        add_options_page(
            'Aparsoft AI Chatbot',
            'Aparsoft Chatbot',
            'manage_options',
            'aparsoft-chatbot',
            array( $this, 'render_settings_page' )
        );
    }

    public function register_settings() {
        // Section
        add_settings_section(
            'aparsoft_chatbot_main',
            'Widget Configuration',
            '__return_null',
            'aparsoft-chatbot'
        );

        // Fields
        $fields = array(
            'aparsoft_widget_id'       => 'Widget API Key',
            'aparsoft_position'        => 'Widget Position',
            'aparsoft_show_branding'   => 'Show Branding',
            'aparsoft_primary_color'   => 'Primary Color',
            'aparsoft_secondary_color' => 'Secondary Color',
            'aparsoft_enabled'         => 'Enable Chatbot',
        );

        foreach ( $fields as $key => $label ) {
            register_setting( 'aparsoft_chatbot_options', $key );
            add_settings_field(
                $key,
                $label,
                array( $this, 'render_field' ),
                'aparsoft-chatbot',
                'aparsoft_chatbot_main',
                array( 'field' => $key )
            );
        }
    }

    public function render_field( $args ) {
        $field = $args['field'];
        $value = get_option( $field );

        switch ( $field ) {
            case 'aparsoft_widget_id':
                echo '<input type="text" name="' . esc_attr( $field ) . '"
                      value="' . esc_attr( $value ) . '"
                      placeholder="e.g. cb_enterprise_xxxxxxxx"
                      class="regular-text" style="width: 400px;" />';
                echo '<p class="description">Get this from your
                      <a href="https://chatbot.aparsoft.com" target="_blank">Aparsoft Dashboard</a>.</p>';
                break;

            case 'aparsoft_position':
                echo '<select name="' . esc_attr( $field ) . '">';
                echo '<option value="bottom-right"' . selected( $value, 'bottom-right', false ) . '>Bottom Right</option>';
                echo '<option value="bottom-left"' . selected( $value, 'bottom-left', false ) . '>Bottom Left</option>';
                echo '</select>';
                break;

            case 'aparsoft_show_branding':
                echo '<input type="checkbox" name="' . esc_attr( $field ) . '"
                      value="1"' . checked( $value, true, false ) . ' />';
                echo '<span class="description"> Shows "Powered by Aparsoft" in the chat widget footer.</span>';
                break;

            case 'aparsoft_primary_color':
                echo '<input type="text" name="' . esc_attr( $field ) . '"
                      value="' . esc_attr( $value ) . '"
                      placeholder="#1d4ed8" class="aparsoft-color-field" />';
                break;

            case 'aparsoft_secondary_color':
                echo '<input type="text" name="' . esc_attr( $field ) . '"
                      value="' . esc_attr( $value ) . '"
                      placeholder="#0f766e" class="aparsoft-color-field" />';
                break;

            case 'aparsoft_enabled':
                echo '<input type="checkbox" name="' . esc_attr( $field ) . '"
                      value="1"' . checked( $value, true, false ) . ' />';
                echo '<span class="description"> Uncheck to disable the chatbot without losing settings.</span>';
                break;
        }
    }

    public function render_settings_page() {
        if ( ! current_user_can( 'manage_options' ) ) return;
        include APARSOFT_CHATBOT_PLUGIN_DIR . 'templates/settings-page.php';
    }

    public function enqueue_assets( $hook ) {
        if ( 'settings_page_aparsoft-chatbot' !== $hook ) return;

        wp_enqueue_style(
            'aparsoft-chatbot-admin',
            APARSOFT_CHATBOT_PLUGIN_URL . 'assets/css/admin.css',
            array(),
            APARSOFT_CHATBOT_VERSION
        );

        wp_enqueue_script(
            'aparsoft-chatbot-admin',
            APARSOFT_CHATBOT_PLUGIN_URL . 'assets/js/admin.js',
            array( 'wp-color-picker' ),
            APARSOFT_CHATBOT_VERSION,
            true
        );

        wp_enqueue_style( 'wp-color-picker' );
    }
}
