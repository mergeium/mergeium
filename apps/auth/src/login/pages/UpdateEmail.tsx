import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Template from "../Template";
import { Input } from "@mergeium/ui/components/input";
import { Label } from "@mergeium/ui/components/label";
import { Button } from "@mergeium/ui/components/button";
import { Checkbox } from "@mergeium/ui/components/checkbox";

export default function UpdateEmail(props: { kcContext: Extract<KcContext, { pageId: "update-email.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { msg, msgStr } = i18n;
    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    const profile = kcContext.profile;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
            headerNode={msg("updateEmailTitle")}
        >
            <form id="kc-update-email-form" className="space-y-4" action={url.loginAction} method="post">
                <div className="space-y-2">
                    <Label htmlFor="email">{msg("email")} <span className="text-destructive">*</span></Label>
                    <Input
                        variant="secondary"
                        id="email"
                        name="email"
                        type="email"
                        size="xl"
                        defaultValue={profile?.attributesByName?.email?.value ?? ""}
                        aria-invalid={messagesPerField.existsError("email")}
                    />
                    {messagesPerField.existsError("email") && (
                        <p className="text-xs text-destructive">{messagesPerField.get("email")}</p>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Checkbox id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
                    <Label htmlFor="logout-sessions" className="text-sm font-normal">
                        {msg("logoutOtherSessions")}
                    </Label>
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
                        >
                            {msg("doCancel")}
                        </Button>
                    )}
                </div>
            </form>
        </Template>
    );
}
