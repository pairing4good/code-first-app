'use server'

import { redirect } from "next/navigation"
import { cookieBasedClient } from "../utils/amplify-utils"
import { revalidatePath } from "next/cache";


export async function deleteComment(formData: FormData) {
    const id = formData.get("id")?.toString();
    if (!id) return;
    const { data: deletedComment } =
        await cookieBasedClient.models.Comment.delete({
            id,
        });
    console.log("deleted", deletedComment);
}

export async function addComment(
    content: string,
    post: Schema["Post"],
    paramsId: string
) {
    if (content.trim().length === 0) return;
    const { data: comment } = await cookieBasedClient.models.Comment.create({
        post,
        content,
    });

    console.log("got comment", comment);
    revalidatePath(`/post/${paramsId}`);
}

export async function createPost(formData: FormData) {
    const { data } = await cookieBasedClient.models.Post.create({
        title: formData.get('title')?.toString() || ''
    })
    console.log("create post data", data);
    redirect('/');
}

export async function onDeletePost(id: string) {
    const { data, errors } = await cookieBasedClient.models.Post.delete({ id })

    console.log("data deleted", data, errors)
    revalidatePath('/')
}