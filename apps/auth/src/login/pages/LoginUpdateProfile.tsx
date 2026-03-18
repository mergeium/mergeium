import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Template from "../Template";
import { Input } from "@mergeium/ui/components/input";
import { Button } from "@mergeium/ui/components/button";

export default function LoginUpdateProfile(props: { kcContext: Extract<KcContext, { pageId: "login-update-profile.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { messagesPerField, url, isAppInitiatedAction } = kcContext;
    const { msg, msgStr } = i18n;

    const profile = kcContext.profile;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            displayRequiredFields
            headerNode={msg("loginProfileTitle")}
            displayMessage={messagesPerField.exists("global")}
        >
            <form id="kc-update-profile-form" className="space-y-4" action={url.loginAction} method="post">
                <div className="space-y-2">
                    <Input
                        variant="secondary"
                        id="firstName"
                        name="firstName"
                        size="xl"
                        placeholder={msgStr("firstName")}
                        defaultValue={profile?.attributesByName?.firstName?.value ?? ""}
                        aria-invalid={messagesPerField.existsError("firstName")}
                    />
                    {messagesPerField.existsError("firstName") && (
                        <p className="text-xs text-destructive">{messagesPerField.get("firstName")}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Input
                        variant="secondary"
                        id="lastName"
                        name="lastName"
                        size="xl"
                        placeholder={msgStr("lastName")}
                        defaultValue={profile?.attributesByName?.lastName?.value ?? ""}
                        aria-invalid={messagesPerField.existsError("lastName")}
                    />
                    {messagesPerField.existsError("lastName") && (
                        <p className="text-xs text-destructive">{messagesPerField.get("lastName")}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Input
                        variant="secondary"
                        id="email"
                        name="email"
                        type="email"
                        size="xl"
                        placeholder={msgStr("email")}
                        defaultValue={profile?.attributesByName?.email?.value ?? ""}
                        aria-invalid={messagesPerField.existsError("email")}
                    />
                    {messagesPerField.existsError("email") && (
                        <p className="text-xs text-destructive">{messagesPerField.get("email")}</p>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        type="submit"
                        size="xl"
                        className={isAppInitiatedAction ? "" : "w-full"}
                    >
                        {msgStr("doSubmit")}
                    </Button>
                    {isAppInitiatedAction && (
                        <Button
                            variant="outline"
                            size="xl"
                            type="submit"
                            name="cancel-aia"
                            value="true"
                            formNoValidate
                        >
                            {msg("doCancel")}
                        </Button>
                    )}
                </div>
            </form>
        </Template>
    );
}
