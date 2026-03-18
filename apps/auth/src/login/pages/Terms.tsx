import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import Template from "../Template";

export default function Terms(props: { kcContext: Extract<KcContext, { pageId: "terms.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { msg, msgStr } = i18n;

    const { url } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            displayMessage={false}
            headerNode={msg("termsTitle")}
        >
            <div className="space-y-4">
                <div className="text-sm text-muted-foreground">{msg("termsText")}</div>
                <form className="flex gap-2" action={url.loginAction} method="POST">
                    <Button type="submit" size="xl" name="accept" id="kc-accept">
                        {msgStr("doAccept")}
                    </Button>
                    <Button type="submit" size="xl" name="cancel" id="kc-decline" variant="outline">
                        {msgStr("doDecline")}
                    </Button>
                </form>
            </div>
        </Template>
    );
}
