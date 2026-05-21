<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class Aparsoft_Chatbot_Script_Injector {

    private $loader_url = 'https://www.aparsoft.com/static/chatbot-widget/widget.loader.js';

    public function __construct() {
        add_action( 'wp_footer', array( $this, 'inject_widget' ) );
    }

    public function inject_widget() {
        // Skip if disabled or no API key
        $enabled   = get_option( 'aparsoft_enabled', true );
        $widget_id = get_option( 'aparsoft_widget_id', '' );

        if ( ! $enabled || empty( $widget_id ) ) {
            return;
        }

        // Build data attributes from settings
        $position        = get_option( 'aparsoft_position', 'bottom-right' );
        $show_branding   = get_option( 'aparsoft_show_branding', true ) ? 'true' : 'false';
        $primary_color   = get_option( 'aparsoft_primary_color', '' );
        $secondary_color = get_option( 'aparsoft_secondary_color', '' );

        // Pass WooCommerce context if available
        $extra_data = $this->get_woocommerce_context();

        echo "\n<!-- Aparsoft AI Chatbot v" . esc_attr( APARSOFT_CHATBOT_VERSION ) . " -->\n";
        echo '<script' . "\n";
        echo '  src="' . esc_url( $this->loader_url ) . '"' . "\n";
        echo '  data-aparsoft-chatbot="true"' . "\n";
        echo '  data-api-key="' . esc_attr( $widget_id ) . '"' . "\n";
        echo '  data-position="' . esc_attr( $position ) . '"' . "\n";
        echo '  data-show-branding="' . esc_attr( $show_branding ) . '"' . "\n";

        if ( ! empty( $primary_color ) ) {
            echo '  data-primary-color="' . esc_attr( $primary_color ) . '"' . "\n";
        }
        if ( ! empty( $secondary_color ) ) {
            echo '  data-secondary-color="' . esc_attr( $secondary_color ) . '"' . "\n";
        }

        // WooCommerce context
        if ( ! empty( $extra_data ) ) {
            echo '  data-user-name="' . esc_attr( $extra_data['user_name'] ) . '"' . "\n";
            echo '  data-cart-count="' . esc_attr( $extra_data['cart_count'] ) . '"' . "\n";
        }

        echo '></script>' . "\n";
        echo "<!-- / Aparsoft AI Chatbot -->\n";
    }

    /**
     * Detect WooCommerce context for personalized chatbot experience.
     * Returns empty array if WooCommerce is not active.
     */
    private function get_woocommerce_context() {
        if ( ! class_exists( 'WooCommerce' ) ) {
            return array();
        }

        $context = array(
            'user_name'   => '',
            'cart_count'  => 0,
        );

        if ( is_user_logged_in() ) {
            $current_user = wp_get_current_user();
            $context['user_name'] = $current_user->display_name;
        }

        if ( function_exists( 'WC' ) && WC()->cart ) {
            $context['cart_count'] = WC()->cart->get_cart_contents_count();
        }

        return $context;
    }
}
