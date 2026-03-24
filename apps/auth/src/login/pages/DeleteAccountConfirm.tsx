import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import Template from "../Template";

export default function DeleteAccountConfirm(props: { kcContext: Extract<KcContext, { pageId: "delete-account-confirm.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { url, triggered_from_aia } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} headerNode={msg("deleteAccountConfirm")}>
            <div className="space-y-3">
                <p className="text-center text-sm font-medium text-destructive">{msg("irreversibleAction")}</p>
                <p className="text-center text-sm text-muted-foreground">{msg("deletingImplies")}</p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    <li>{msg("loggingOutImmediately")}</li>
                    <li>{msg("errasingData")}</li>
                </ul>
                <p className="text-center text-sm font-medium">{msg("finalDeletionConfirmation")}</p>
                <form action={url.loginAction} method="post" className="flex gap-2">
                    {triggered_from_aia && (
                        <Button type="submit" size="xl" className="flex-1" name="cancel-aia" value="true" variant="outline">
                            {msgStr("doCancel")}
                        </Button>
                    )}
                    <Button type="submit" size="xl" className={triggered_from_aia ? "flex-1" : "w-full"} variant="destructive">
                        {msgStr("doConfirmDelete")}
                    </Button>
                </form>
            </div>
        </Template>
    );
}
