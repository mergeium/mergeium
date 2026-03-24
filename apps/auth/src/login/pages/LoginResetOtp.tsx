import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import { Label } from "@mergeium/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@mergeium/ui/components/radio-group";
import Template from "../Template";

export default function LoginResetOtp(props: { kcContext: Extract<KcContext, { pageId: "login-reset-otp.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { url, messagesPerField, configuredOtpCredentials } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <form id="kc-otp-reset-form" action={url.loginAction} method="post" className="space-y-6">
                <p id="kc-otp-reset-form-description" className="text-center text-sm text-muted-foreground">
                    {msg("otp-reset-description")}
                </p>

                <RadioGroup defaultValue={configuredOtpCredentials.selectedCredentialId} name="selectedCredentialId">
                    {configuredOtpCredentials.userOtpCredentials.map((otpCredential, index) => (
                        <div key={otpCredential.id} className="flex items-center gap-3 rounded-md border p-3">
                            <RadioGroupItem value={otpCredential.id} id={`kc-otp-credential-${index}`} />
                            <Label htmlFor={`kc-otp-credential-${index}`} className="cursor-pointer">
                                {otpCredential.userLabel}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>

                <Button type="submit" size="xl" className="w-full" id="kc-otp-reset-form-submit">
                    {msgStr("doSubmit")}
                </Button>
            </form>
        </Template>
    );
}
