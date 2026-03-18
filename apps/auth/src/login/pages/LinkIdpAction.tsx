import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import Template from "../Template";

export default function LinkIdpAction(props: { kcContext: Extract<KcContext, { pageId: "link-idp-action.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { idpDisplayName, url } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            headerNode={msg("linkIdpActionTitle", idpDisplayName)}
            displayMessage={false}
        >
            <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                    {msg("linkIdpActionMessage", idpDisplayName)}
                </p>
                <form action={url.loginAction} method="post">
                    <div className="flex gap-2">
                        <Button type="submit" size="xl" className="flex-1 w-full" name="continue" id="kc-continue">
                            {msgStr("doContinue")}
                        </Button>
                        <Button type="submit" size="xl" className="flex-1 w-full" name="cancel-aia" id="kc-cancel" variant="outline">
                            {msgStr("doCancel")}
                        </Button>
                    </div>
                </form>
            </div>
        </Template>
    );
}
