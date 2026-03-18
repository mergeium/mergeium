import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import { Input } from "@mergeium/ui/components/input";
import { Label } from "@mergeium/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@mergeium/ui/components/radio-group";
import Template from "../Template";

export default function LoginOtp(props: { kcContext: Extract<KcContext, { pageId: "login-otp.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { otpLogin, url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <form
                id="kc-otp-login-form"
                action={url.loginAction}
                onSubmit={() => {
                    setIsSubmitting(true);
                    return true;
                }}
                method="post"
                className="space-y-6"
            >
                {otpLogin.userOtpCredentials.length > 1 && (
                    <RadioGroup defaultValue={otpLogin.selectedCredentialId} name="selectedCredentialId">
                        {otpLogin.userOtpCredentials.map((otpCredential, index) => (
                            <div key={index} className="flex items-center gap-3 rounded-md border p-3">
                                <RadioGroupItem value={otpCredential.id} id={`kc-otp-credential-${index}`} />
                                <Label htmlFor={`kc-otp-credential-${index}`} className="cursor-pointer">
                                    {otpCredential.userLabel}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                )}

                <div className="space-y-2">
                    <Input
                        variant="secondary"
                        id="otp"
                        name="otp"
                        autoComplete="off"
                        type="text"
                        size="xl"
                        autoFocus
                        placeholder={msgStr("loginOtpOneTime")}
                        aria-invalid={messagesPerField.existsError("totp")}
                    />
                    {messagesPerField.existsError("totp") && (
                        <span
                            id="input-error-otp-code"
                            className="text-xs text-destructive"
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("totp"))
                            }}
                        />
                    )}
                </div>

                <Button type="submit" size="xl" className="w-full" disabled={isSubmitting}>
                    {msgStr("doLogIn")}
                </Button>
            </form>
        </Template>
    );
}
