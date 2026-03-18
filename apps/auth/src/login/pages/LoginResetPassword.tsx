import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import { Input } from "@mergeium/ui/components/input";
import Template from "../Template";

export default function LoginResetPassword(props: { kcContext: Extract<KcContext, { pageId: "login-reset-password.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
            headerNode={msg("emailForgotTitle")}
        >
            <form id="kc-reset-password-form" action={url.loginAction} method="post" className="space-y-4">
                <div className="space-y-2">
                    <Input
                        variant="secondary"
                        type="text"
                        id="username"
                        name="username"
                        size="xl"
                        autoFocus
                        placeholder={
                            !realm.loginWithEmailAllowed
                                ? msgStr("username")
                                : !realm.registrationEmailAsUsername
                                  ? msgStr("usernameOrEmail")
                                  : msgStr("email")
                        }
                        defaultValue={auth.attemptedUsername ?? ""}
                        aria-invalid={messagesPerField.existsError("username")}
                    />
                    {messagesPerField.existsError("username") && (
                        <span
                            id="input-error-username"
                            className="text-sm text-destructive"
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("username"))
                            }}
                        />
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <Button variant="link" size="sm" className="px-0" asChild>
                        <a href={url.loginUrl}>{msg("backToLogin")}</a>
                    </Button>
                    <Button type="submit" size="xl">{msgStr("doSubmit")}</Button>
                </div>
            </form>
        </Template>
    );
}
