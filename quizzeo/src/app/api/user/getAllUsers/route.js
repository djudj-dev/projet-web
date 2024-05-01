import { NextResponse } from "next/server";
import { user } from "../../../../lib/user";

export async function GET(request) {
    //TODO: prévoir un middleware afin que l'appel de cet API puisse être effectué uniquement par un utilisateur disposant des droits

    const listOfUsers = await user.getAllUsers();
    return NextResponse.json(listOfUsers);
}
