import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";

export default function DeleteCredential(props: PageProps<Extract<KcContext, { pageId: "delete-credential.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msgStr, msg } = i18n;

    const { url, credentialLabel } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("deleteCredentialTitle", credentialLabel)}
        >
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{msg("deleteCredentialMessage", credentialLabel)}</p>
                <form className="flex gap-2" action={url.loginAction} method="POST">
                    <Button type="submit" name="accept" id="kc-accept" variant="destructive">
                        {msgStr("doConfirmDelete")}
                    </Button>
                    <Button type="submit" name="cancel-aia" id="kc-decline" variant="outline">
                        {msgStr("doCancel")}
                    </Button>
                </form>
            </div>
        </Template>
    );
}
