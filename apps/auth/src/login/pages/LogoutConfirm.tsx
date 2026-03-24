import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import Template from "../Template";

export default function LogoutConfirm(props: { kcContext: Extract<KcContext, { pageId: "logout-confirm.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { url, client, logoutConfirm } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} headerNode={msg("logoutConfirmTitle")}>
            <div className="space-y-3">
                <p className="text-center text-sm text-muted-foreground">{msg("logoutConfirmHeader")}</p>
                <form action={url.logoutConfirmAction} method="POST">
                    <input type="hidden" name="session_code" value={logoutConfirm.code} />
                    <Button
                        tabIndex={4}
                        type="submit"
                        name="confirmLogout"
                        id="kc-logout"
                        size="xl"
                        className="w-full"
                    >
                        {msgStr("doLogout")}
                    </Button>
                </form>
                {!logoutConfirm.skipLink && client.baseUrl && (
                    <p className="text-center text-sm text-muted-foreground">
                        <a href={client.baseUrl} className="hover:underline hover:text-foreground">{msg("backToApplication")}</a>
                    </p>
                )}
            </div>
        </Template>
    );
}
