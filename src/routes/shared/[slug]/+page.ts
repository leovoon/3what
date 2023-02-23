import {  redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async function ({ params }) {
	const { slug } = params

	if(!slug) {
		return redirect(302, '/')
	}

	return { slug }
}
