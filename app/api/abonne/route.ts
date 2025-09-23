
import mailChimp from "@mailchimp/mailchimp_marketing";
import { NextResponse } from "next/server";


mailChimp.setConfig({
    apiKey : process.env.MAILCHIMP_API_KEY!,
    server : process.env.MAILCHIMP_API_SERVER! ,
});

export async function POST(request: Request) {
    try {
        const {email} = await request.json();

        if(!email) {
            return NextResponse.json(
                {error:"Veuillez enter une adresse e-mail valide "},
                {status : 400}
            );
        }

        const respose = await mailChimp.lists.addListMember(
            process.env.MAILCHIMP_AUDIENCE_ID!,
            {email_address:email , status : "subscribed"}
        ) 

        return NextResponse.json(
            {
                message:"L'adresse e-mail iscripten avec success✅",
                data : respose,
            },
            {status : 201}
        );

    } catch (error) {

        return NextResponse.json(
            {error:"Cette adresse e-mail n'est pas valide ou est deja utilisee 🚫"},
            {status : 500}
        );
    }
    
}