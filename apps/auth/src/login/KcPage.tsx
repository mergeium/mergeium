import { Suspense, lazy } from "react";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";

const UserProfileFormFields = lazy(
  () => import("keycloakify/login/UserProfileFormFields"),
);

const Login = lazy(() => import("./pages/Login"));
const LoginUsername = lazy(() => import("./pages/LoginUsername"));
const LoginPassword = lazy(() => import("./pages/LoginPassword"));
const Register = lazy(() => import("./pages/Register"));
const Info = lazy(() => import("./pages/Info"));
const Error = lazy(() => import("./pages/Error"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"));
const Terms = lazy(() => import("./pages/Terms"));
const LoginOtp = lazy(() => import("./pages/LoginOtp"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));
const LoginUpdateProfile = lazy(() => import("./pages/LoginUpdateProfile"));
const LoginIdpLinkConfirm = lazy(() => import("./pages/LoginIdpLinkConfirm"));
const LoginIdpLinkEmail = lazy(() => import("./pages/LoginIdpLinkEmail"));
const LoginPageExpired = lazy(() => import("./pages/LoginPageExpired"));
const LoginConfigTotp = lazy(() => import("./pages/LoginConfigTotp"));
const LogoutConfirm = lazy(() => import("./pages/LogoutConfirm"));
const LoginOauthGrant = lazy(() => import("./pages/LoginOauthGrant"));
const LoginOauth2DeviceVerifyUserCode = lazy(
  () => import("./pages/LoginOauth2DeviceVerifyUserCode"),
);
const IdpReviewUserProfile = lazy(() => import("./pages/IdpReviewUserProfile"));
const UpdateEmail = lazy(() => import("./pages/UpdateEmail"));
const SelectAuthenticator = lazy(() => import("./pages/SelectAuthenticator"));
const WebauthnAuthenticate = lazy(() => import("./pages/WebauthnAuthenticate"));
const WebauthnRegister = lazy(() => import("./pages/WebauthnRegister"));
const WebauthnError = lazy(() => import("./pages/WebauthnError"));
const LoginRecoveryAuthnCodeConfig = lazy(
  () => import("./pages/LoginRecoveryAuthnCodeConfig"),
);
const LoginRecoveryAuthnCodeInput = lazy(
  () => import("./pages/LoginRecoveryAuthnCodeInput"),
);
const LoginResetOtp = lazy(() => import("./pages/LoginResetOtp"));
const LoginPasskeysConditionalAuthenticate = lazy(
  () => import("./pages/LoginPasskeysConditionalAuthenticate"),
);
const LoginIdpLinkConfirmOverride = lazy(
  () => import("./pages/LoginIdpLinkConfirmOverride"),
);
const Code = lazy(() => import("./pages/Code"));
const DeleteAccountConfirm = lazy(() => import("./pages/DeleteAccountConfirm"));
const DeleteCredential = lazy(() => import("./pages/DeleteCredential"));
const FrontchannelLogout = lazy(() => import("./pages/FrontchannelLogout"));
const LinkIdpAction = lazy(() => import("./pages/LinkIdpAction"));
const LoginX509Info = lazy(() => import("./pages/LoginX509Info"));
const SamlPostForm = lazy(() => import("./pages/SamlPostForm"));
const SelectOrganization = lazy(() => import("./pages/SelectOrganization"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;

  const { i18n } = useI18n({ kcContext });

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "login.ftl":
            return <Login kcContext={kcContext} i18n={i18n} />;
          case "login-username.ftl":
            return <LoginUsername kcContext={kcContext} i18n={i18n} />;
          case "login-password.ftl":
            return <LoginPassword kcContext={kcContext} i18n={i18n} />;
          case "register.ftl":
            return <Register kcContext={kcContext} i18n={i18n} />;
          case "info.ftl":
            return <Info kcContext={kcContext} i18n={i18n} />;
          case "error.ftl":
            return <Error kcContext={kcContext} i18n={i18n} />;
          case "login-reset-password.ftl":
            return <LoginResetPassword kcContext={kcContext} i18n={i18n} />;
          case "login-verify-email.ftl":
            return <LoginVerifyEmail kcContext={kcContext} i18n={i18n} />;
          case "terms.ftl":
            return <Terms kcContext={kcContext} i18n={i18n} />;
          case "login-otp.ftl":
            return <LoginOtp kcContext={kcContext} i18n={i18n} />;
          case "login-update-password.ftl":
            return <LoginUpdatePassword kcContext={kcContext} i18n={i18n} />;
          case "login-update-profile.ftl":
            return <LoginUpdateProfile kcContext={kcContext} i18n={i18n} />;
          case "login-idp-link-confirm.ftl":
            return <LoginIdpLinkConfirm kcContext={kcContext} i18n={i18n} />;
          case "login-idp-link-email.ftl":
            return <LoginIdpLinkEmail kcContext={kcContext} i18n={i18n} />;
          case "login-page-expired.ftl":
            return <LoginPageExpired kcContext={kcContext} i18n={i18n} />;
          case "login-config-totp.ftl":
            return <LoginConfigTotp kcContext={kcContext} i18n={i18n} />;
          case "logout-confirm.ftl":
            return <LogoutConfirm kcContext={kcContext} i18n={i18n} />;
          case "login-oauth-grant.ftl":
            return <LoginOauthGrant kcContext={kcContext} i18n={i18n} />;
          case "login-oauth2-device-verify-user-code.ftl":
            return (
              <LoginOauth2DeviceVerifyUserCode
                kcContext={kcContext}
                i18n={i18n}
              />
            );
          case "idp-review-user-profile.ftl":
            return <IdpReviewUserProfile kcContext={kcContext} i18n={i18n} />;
          case "update-email.ftl":
            return <UpdateEmail kcContext={kcContext} i18n={i18n} />;
          case "select-authenticator.ftl":
            return <SelectAuthenticator kcContext={kcContext} i18n={i18n} />;
          case "webauthn-authenticate.ftl":
            return <WebauthnAuthenticate kcContext={kcContext} i18n={i18n} />;
          case "webauthn-register.ftl":
            return <WebauthnRegister kcContext={kcContext} i18n={i18n} />;
          case "webauthn-error.ftl":
            return <WebauthnError kcContext={kcContext} i18n={i18n} />;
          case "login-recovery-authn-code-config.ftl":
            return (
              <LoginRecoveryAuthnCodeConfig kcContext={kcContext} i18n={i18n} />
            );
          case "login-recovery-authn-code-input.ftl":
            return (
              <LoginRecoveryAuthnCodeInput kcContext={kcContext} i18n={i18n} />
            );
          case "login-reset-otp.ftl":
            return <LoginResetOtp kcContext={kcContext} i18n={i18n} />;
          case "login-passkeys-conditional-authenticate.ftl":
            return (
              <LoginPasskeysConditionalAuthenticate
                kcContext={kcContext}
                i18n={i18n}
              />
            );
          case "login-idp-link-confirm-override.ftl":
            return (
              <LoginIdpLinkConfirmOverride kcContext={kcContext} i18n={i18n} />
            );
          case "code.ftl":
            return <Code kcContext={kcContext} i18n={i18n} />;
          case "delete-account-confirm.ftl":
            return <DeleteAccountConfirm kcContext={kcContext} i18n={i18n} />;
          case "delete-credential.ftl":
            return <DeleteCredential kcContext={kcContext} i18n={i18n} />;
          case "frontchannel-logout.ftl":
            return <FrontchannelLogout kcContext={kcContext} i18n={i18n} />;
          case "link-idp-action.ftl":
            return <LinkIdpAction kcContext={kcContext} i18n={i18n} />;
          case "login-x509-info.ftl":
            return <LoginX509Info kcContext={kcContext} i18n={i18n} />;
          case "saml-post-form.ftl":
            return <SamlPostForm kcContext={kcContext} i18n={i18n} />;
          case "select-organization.ftl":
            return <SelectOrganization kcContext={kcContext} i18n={i18n} />;
          default:
            return (
              <DefaultPage
                kcContext={kcContext}
                i18n={i18n}
                Template={Template}
                doUseDefaultCss={false}
                UserProfileFormFields={UserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
              />
            );
        }
      })()}
    </Suspense>
  );
}
