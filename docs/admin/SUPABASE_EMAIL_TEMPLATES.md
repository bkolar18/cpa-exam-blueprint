# Supabase Auth Email Templates

Copy these templates into Supabase Dashboard → Authentication → Email Templates

---

## 1. Confirm Signup

**Subject:** `Confirm your Meridian CPA Review account`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Confirm your email</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">

    <!-- Header -->
    <div style="background:#ffffff;padding:24px 30px;border-radius:12px 12px 0 0;text-align:left;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="vertical-align:middle;padding-right:10px;">
            <img src="https://www.meridiancpareview.com/logo.png" alt="Meridian CPA Review" width="36" height="36" style="display:block;">
          </td>
          <td style="vertical-align:middle;">
            <span style="font-size:18px;font-weight:700;color:#1e3a5f;">Meridian</span>
            <span style="font-size:12px;font-weight:600;color:#64748b;margin-left:4px;">CPA Review</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Content -->
    <div style="background:#ffffff;padding:35px;border-radius:0 0 12px 12px;">
      <h1 style="margin:0 0 20px 0;font-size:26px;font-weight:700;color:#1a1a2e;">Confirm your email</h1>

      <p style="margin:0 0 24px 0;font-size:16px;line-height:1.7;color:#1a1a2e;">
        Thanks for signing up for Meridian CPA Review! Click the button below to verify your email address and get started.
      </p>

      <!-- Button -->
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px 0;">
        <tr>
          <td style="border-radius:8px;background:#16a34a;">
            <a href="{{ .ConfirmationURL }}" target="_blank" style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;">Verify Email Address</a>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 16px 0;font-size:14px;color:#64748b;">
        If you didn't create an account with Meridian CPA Review, you can safely ignore this email.
      </p>

      <p style="margin:0;font-size:14px;color:#64748b;">
        Button not working? Copy and paste this link into your browser:<br>
        <a href="{{ .ConfirmationURL }}" style="color:#1e3a5f;word-break:break-all;">{{ .ConfirmationURL }}</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;color:#64748b;font-size:12px;margin-top:24px;padding:0 20px;">
      <p style="margin:0;">This is a transactional email from Meridian CPA Review.</p>
      <p style="margin:8px 0 0 0;">If you didn't request this, please ignore it or contact support.</p>
      <p style="margin-top:16px;">
        <a href="https://www.meridiancpareview.com/support" style="color:#1e3a5f;text-decoration:none;">Contact Support</a>
      </p>
    </div>

  </div>
</body>
</html>
```

---

## 2. Reset Password

**Subject:** `Reset your Meridian CPA Review password`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Reset your password</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">

    <!-- Header -->
    <div style="background:#ffffff;padding:24px 30px;border-radius:12px 12px 0 0;text-align:left;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="vertical-align:middle;padding-right:10px;">
            <img src="https://www.meridiancpareview.com/logo.png" alt="Meridian CPA Review" width="36" height="36" style="display:block;">
          </td>
          <td style="vertical-align:middle;">
            <span style="font-size:18px;font-weight:700;color:#1e3a5f;">Meridian</span>
            <span style="font-size:12px;font-weight:600;color:#64748b;margin-left:4px;">CPA Review</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Content -->
    <div style="background:#ffffff;padding:35px;border-radius:0 0 12px 12px;">
      <h1 style="margin:0 0 20px 0;font-size:26px;font-weight:700;color:#1a1a2e;">Reset your password</h1>

      <p style="margin:0 0 24px 0;font-size:16px;line-height:1.7;color:#1a1a2e;">
        We received a request to reset your password. Click the button below to choose a new password.
      </p>

      <!-- Button -->
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px 0;">
        <tr>
          <td style="border-radius:8px;background:#16a34a;">
            <a href="{{ .ConfirmationURL }}" target="_blank" style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;">Reset Password</a>
          </td>
        </tr>
      </table>

      <!-- Warning Box -->
      <div style="background:#fef3c7;padding:16px 20px;border-radius:8px;margin:0 0 24px 0;border-left:4px solid #d97706;">
        <p style="margin:0;font-size:14px;color:#92400e;">
          <strong>This link expires in 24 hours.</strong> If you didn't request a password reset, please ignore this email or contact support if you're concerned.
        </p>
      </div>

      <p style="margin:0;font-size:14px;color:#64748b;">
        Button not working? Copy and paste this link into your browser:<br>
        <a href="{{ .ConfirmationURL }}" style="color:#1e3a5f;word-break:break-all;">{{ .ConfirmationURL }}</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;color:#64748b;font-size:12px;margin-top:24px;padding:0 20px;">
      <p style="margin:0;">This is a transactional email from Meridian CPA Review.</p>
      <p style="margin:8px 0 0 0;">If you didn't request this, please ignore it or contact support.</p>
      <p style="margin-top:16px;">
        <a href="https://www.meridiancpareview.com/support" style="color:#1e3a5f;text-decoration:none;">Contact Support</a>
      </p>
    </div>

  </div>
</body>
</html>
```

---

## 3. Magic Link

**Subject:** `Your Meridian CPA Review login link`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Your login link</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">

    <!-- Header -->
    <div style="background:#ffffff;padding:24px 30px;border-radius:12px 12px 0 0;text-align:left;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="vertical-align:middle;padding-right:10px;">
            <img src="https://www.meridiancpareview.com/logo.png" alt="Meridian CPA Review" width="36" height="36" style="display:block;">
          </td>
          <td style="vertical-align:middle;">
            <span style="font-size:18px;font-weight:700;color:#1e3a5f;">Meridian</span>
            <span style="font-size:12px;font-weight:600;color:#64748b;margin-left:4px;">CPA Review</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Content -->
    <div style="background:#ffffff;padding:35px;border-radius:0 0 12px 12px;">
      <h1 style="margin:0 0 20px 0;font-size:26px;font-weight:700;color:#1a1a2e;">Your login link</h1>

      <p style="margin:0 0 24px 0;font-size:16px;line-height:1.7;color:#1a1a2e;">
        Click the button below to securely log in to your Meridian CPA Review account. No password needed!
      </p>

      <!-- Button -->
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px 0;">
        <tr>
          <td style="border-radius:8px;background:#16a34a;">
            <a href="{{ .ConfirmationURL }}" target="_blank" style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;">Log In to Your Account</a>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 16px 0;font-size:14px;color:#64748b;">
        This link expires in 1 hour and can only be used once.
      </p>

      <p style="margin:0;font-size:14px;color:#64748b;">
        Button not working? Copy and paste this link into your browser:<br>
        <a href="{{ .ConfirmationURL }}" style="color:#1e3a5f;word-break:break-all;">{{ .ConfirmationURL }}</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;color:#64748b;font-size:12px;margin-top:24px;padding:0 20px;">
      <p style="margin:0;">This is a transactional email from Meridian CPA Review.</p>
      <p style="margin:8px 0 0 0;">If you didn't request this, please ignore it or contact support.</p>
      <p style="margin-top:16px;">
        <a href="https://www.meridiancpareview.com/support" style="color:#1e3a5f;text-decoration:none;">Contact Support</a>
      </p>
    </div>

  </div>
</body>
</html>
```

---

## 4. Invite User

**Subject:** `You've been invited to Meridian CPA Review`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>You're invited</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1e3a5f,#152a45);color:#ffffff;padding:30px;border-radius:12px 12px 0 0;text-align:center;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
        <tr>
          <td style="vertical-align:middle;padding-right:12px;">
            <img src="https://www.meridiancpareview.com/logo-white.png" alt="Meridian CPA Review" width="48" height="48" style="display:block;">
          </td>
          <td style="vertical-align:middle;">
            <span style="font-size:22px;font-weight:700;color:#ffffff;">Meridian</span>
            <span style="font-size:14px;font-weight:600;color:rgba(255,255,255,0.85);margin-left:4px;">CPA Review</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Content -->
    <div style="background:#ffffff;padding:35px;border-radius:0 0 12px 12px;">
      <h1 style="margin:0 0 20px 0;font-size:26px;font-weight:700;color:#1a1a2e;">You're invited!</h1>

      <p style="margin:0 0 24px 0;font-size:16px;line-height:1.7;color:#1a1a2e;">
        You've been invited to join Meridian CPA Review, your smart companion for CPA exam prep. Click below to accept your invitation and create your account.
      </p>

      <!-- Button -->
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px 0;">
        <tr>
          <td style="border-radius:8px;background:#16a34a;">
            <a href="{{ .ConfirmationURL }}" target="_blank" style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;">Accept Invitation</a>
          </td>
        </tr>
      </table>

      <p style="margin:0;font-size:14px;color:#64748b;">
        Button not working? Copy and paste this link into your browser:<br>
        <a href="{{ .ConfirmationURL }}" style="color:#1e3a5f;word-break:break-all;">{{ .ConfirmationURL }}</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;color:#64748b;font-size:12px;margin-top:24px;padding:0 20px;">
      <p style="margin:0;">This is an invitation from Meridian CPA Review.</p>
      <p style="margin-top:16px;">
        <a href="https://www.meridiancpareview.com" style="color:#1e3a5f;text-decoration:none;">meridiancpareview.com</a>
      </p>
    </div>

  </div>
</body>
</html>
```

---

## 5. Change Email Address

**Subject:** `Confirm your new email address`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Confirm email change</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">

    <!-- Header -->
    <div style="background:#ffffff;padding:24px 30px;border-radius:12px 12px 0 0;text-align:left;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="vertical-align:middle;padding-right:10px;">
            <img src="https://www.meridiancpareview.com/logo.png" alt="Meridian CPA Review" width="36" height="36" style="display:block;">
          </td>
          <td style="vertical-align:middle;">
            <span style="font-size:18px;font-weight:700;color:#1e3a5f;">Meridian</span>
            <span style="font-size:12px;font-weight:600;color:#64748b;margin-left:4px;">CPA Review</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Content -->
    <div style="background:#ffffff;padding:35px;border-radius:0 0 12px 12px;">
      <h1 style="margin:0 0 20px 0;font-size:26px;font-weight:700;color:#1a1a2e;">Confirm your new email</h1>

      <p style="margin:0 0 24px 0;font-size:16px;line-height:1.7;color:#1a1a2e;">
        You requested to change your email address for your Meridian CPA Review account. Click the button below to confirm this change.
      </p>

      <!-- Button -->
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px 0;">
        <tr>
          <td style="border-radius:8px;background:#16a34a;">
            <a href="{{ .ConfirmationURL }}" target="_blank" style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;">Confirm Email Change</a>
          </td>
        </tr>
      </table>

      <!-- Warning Box -->
      <div style="background:#fef3c7;padding:16px 20px;border-radius:8px;margin:0 0 24px 0;border-left:4px solid #d97706;">
        <p style="margin:0;font-size:14px;color:#92400e;">
          <strong>Didn't request this?</strong> If you didn't request an email change, please contact support immediately as someone may have accessed your account.
        </p>
      </div>

      <p style="margin:0;font-size:14px;color:#64748b;">
        Button not working? Copy and paste this link into your browser:<br>
        <a href="{{ .ConfirmationURL }}" style="color:#1e3a5f;word-break:break-all;">{{ .ConfirmationURL }}</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;color:#64748b;font-size:12px;margin-top:24px;padding:0 20px;">
      <p style="margin:0;">This is a transactional email from Meridian CPA Review.</p>
      <p style="margin:8px 0 0 0;">If you didn't request this, please contact support immediately.</p>
      <p style="margin-top:16px;">
        <a href="https://www.meridiancpareview.com/support" style="color:#1e3a5f;text-decoration:none;">Contact Support</a>
      </p>
    </div>

  </div>
</body>
</html>
```

---

## Brand Colors Reference

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#1e3a5f` | Headers, links, brand text |
| Primary Dark | `#152a45` | Gradient backgrounds |
| Secondary/Success | `#16a34a` | Buttons, success states |
| Text | `#1a1a2e` | Body text |
| Muted | `#64748b` | Secondary text, footer |
| Warning | `#d97706` | Warning boxes |
| Warning BG | `#fef3c7` | Warning box background |
| Background | `#f5f5f5` | Email body background |
| White | `#ffffff` | Content areas |
| Border | `#e2e8f0` | Dividers |
