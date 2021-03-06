import { Response, ErrorResponse } from "@webiny/commodo-graphql";
import populateEntry from "@webiny/api-cms/utils/populateEntry";
import saveEntry from "@webiny/api-cms/utils/saveEntry";

export const resolveCreate = ({ models, model }) => async (
    root: any,
    args: Object,
    context: Object
) => {
    const entry = {};

    try {
        const params = { models, model, context };
        await populateEntry(entry, args.data, params);
        entry._id = await saveEntry(entry, params);
    } catch (e) {
        return new ErrorResponse({
            code: e.code,
            message: e.message,
            data: e.data || null
        });
    }

    return new Response(entry);
};
