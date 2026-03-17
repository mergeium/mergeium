import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";

export default function Terms(props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg, msgStr } = i18n;

    const { url } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("termsTitle")}
        >
            <div className="space-y-4">
                <div className="text-sm text-muted-foreground">{msg("termsText")}</div>
                <form className="flex gap-2" action={url.loginAction} method="POST">
                    <Button type="submit" name="accept" id="kc-accept">
                        {msgStr("doAccept")}
                    </Button>
                    <Button type="submit" name="cancel" id="kc-decline" variant="outline">
                        {msgStr("doDecline")}
                    </Button>
                </form>
            </div>
        </Template>
    );
}
