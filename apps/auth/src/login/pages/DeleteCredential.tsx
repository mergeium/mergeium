import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import Template from "../Template";

export default function DeleteCredential(props: { kcContext: Extract<KcContext, { pageId: "delete-credential.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { msgStr, msg } = i18n;

    const { url, credentialLabel } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            displayMessage={false}
            headerNode={msg("deleteCredentialTitle", credentialLabel)}
        >
            <div className="space-y-3">
                <p className="text-sm text-muted-foreground">{msg("deleteCredentialMessage", credentialLabel)}</p>
                <form className="flex gap-2" action={url.loginAction} method="POST">
                    <Button type="submit" size="xl" className="flex-1 w-full" name="accept" id="kc-accept" variant="destructive">
                        {msgStr("doConfirmDelete")}
                    </Button>
                    <Button type="submit" size="xl" className="flex-1 w-full" name="cancel-aia" id="kc-decline" variant="outline">
                        {msgStr("doCancel")}
                    </Button>
                </form>
            </div>
        </Template>
    );
}
