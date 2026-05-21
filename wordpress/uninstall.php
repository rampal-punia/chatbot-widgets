<?php
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    exit;
}

// Remove all plugin options
$options = array(
    'aparsoft_widget_id',
    'aparsoft_position',
    'aparsoft_show_branding',
    'aparsoft_primary_color',
    'aparsoft_secondary_color',
    'aparsoft_enabled',
);

foreach ( $options as $option ) {
    delete_option( $option );
}
