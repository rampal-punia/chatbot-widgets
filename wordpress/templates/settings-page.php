<?php if ( ! current_user_can( 'manage_options' ) ) return; ?>
<div class="wrap">
    <h1>
        <span style="vertical-align:middle;">Aparsoft AI Chatbot</span>
    </h1>

    <div class="aparsoft-chatbot-hero" style="background:linear-gradient(135deg,#1d4ed8,#0f766e);color:#fff;padding:20px 24px;border-radius:12px;margin:16px 0 24px;">
        <h2 style="color:#fff;margin:0 0 8px;font-size:18px;">Add an AI chatbot trained on YOUR website content</h2>
        <p style="margin:0;opacity:0.9;">Scrapes your site, builds a knowledge base, answers visitor questions 24/7.
        <strong>50 free messages per month.</strong></p>
    </div>

    <form method="post" action="options.php">
        <?php
            settings_fields( 'aparsoft_chatbot_options' );
            do_settings_sections( 'aparsoft-chatbot' );
            submit_button( 'Save & Connect Chatbot' );
        ?>
    </form>

    <hr style="margin:30px 0;">

    <h3>How to Get Your Widget API Key</h3>
    <ol>
        <li>Sign up at <a href="https://chatbot.aparsoft.com" target="_blank">chatbot.aparsoft.com</a> (free)</li>
        <li>Register your website URL in the dashboard</li>
        <li>Wait 3-5 minutes while your site is scraped and vectorized</li>
        <li>Copy the <strong>API Key</strong> from the Integrations tab</li>
        <li>Paste it above and click <strong>Save & Connect Chatbot</strong></li>
    </ol>

    <h3>Need Help?</h3>
    <p>
        Email <a href="mailto:hello@aparsoft.com">hello@aparsoft.com</a> or visit
        <a href="https://chatbot.aparsoft.com/docs" target="_blank">docs.aparsoft.com</a>
    </p>
</div>
