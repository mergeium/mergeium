import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";

export default function LinkIdpAction(props: PageProps<Extract<KcContext, { pageId: "link-idp-action.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { idpDisplayName, url } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("linkIdpActionTitle", idpDisplayName)}
            displayMessage={false}
        >
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    {msg("linkIdpActionMessage", idpDisplayName)}
                </p>
                <form action={url.loginAction} method="post">
                    <div className="flex gap-2">
                        <Button type="submit" name="continue" id="kc-continue">
                            {msgStr("doContinue")}
                        </Button>
                        <Button type="submit" name="cancel-aia" id="kc-cancel" variant="outline">
                            {msgStr("doCancel")}
                        </Button>
                    </div>
                </form>
            </div>
        </Template>
    );
}
