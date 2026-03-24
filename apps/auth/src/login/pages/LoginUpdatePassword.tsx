import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import { Input } from "@mergeium/ui/components/input";
import { Label } from "@mergeium/ui/components/label";
import { Checkbox } from "@mergeium/ui/components/checkbox";
import Template from "../Template";

export default function LoginUpdatePassword(props: { kcContext: Extract<KcContext, { pageId: "login-update-password.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={msg("updatePasswordTitle")}
        >
            <form id="kc-passwd-update-form" className="space-y-3" action={url.loginAction} method="post">
                <div className="space-y-2">
                        <Input
                            variant="secondary"
                            type="password"
                            id="password-new"
                            name="password-new"
                            size="xl"
                            autoFocus
                            placeholder={msgStr("passwordNew")}
                            autoComplete="new-password"
                            aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                        />
                    {messagesPerField.existsError("password") && (
                        <span
                            id="input-error-password"
                            className="text-xs text-destructive"
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("password"))
                            }}
                        />
                    )}
                </div>

                <div className="space-y-2">
                        <Input
                            variant="secondary"
                            type="password"
                            id="password-confirm"
                            name="password-confirm"
                            size="xl"
                            placeholder={msgStr("passwordConfirm")}
                            autoComplete="new-password"
                            aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                        />
                    {messagesPerField.existsError("password-confirm") && (
                        <span
                            id="input-error-password-confirm"
                            className="text-xs text-destructive"
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("password-confirm"))
                            }}
                        />
                    )}
                </div>

                <LogoutOtherSessions i18n={i18n} />

                <div className="flex gap-2">
                    <Button type="submit" size="xl" className="flex-1">
                        {msgStr("doSubmit")}
                    </Button>
                    {isAppInitiatedAction && (
                        <Button variant="outline" size="xl" className="flex-1" type="submit" name="cancel-aia" value="true">
                            {msg("doCancel")}
                        </Button>
                    )}
                </div>
            </form>
        </Template>
    );
}

function LogoutOtherSessions(props: { i18n: I18n }) {
    const { i18n } = props;

    const { msg } = i18n;

    return (
        <div className="flex items-center gap-2">
            <Checkbox id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
            <Label htmlFor="logout-sessions" className="text-xs font-normal">
                {msg("logoutOtherSessions")}
            </Label>
        </div>
    );
}

