import {prisma} from '../../lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next/types';
import {getSession} from 'next-auth/react';


export default async function handler(
    req: any,
    res: any
) {
    if (req.method === 'POST') {
        try {
            const {title, requirements, criteria, author} = req.body;
            const session = await getSession({req});
            const result = await prisma.issue.create({
                data: {
                    title,
                    requirements,
                    criteria,
                    author
                },
            });
            console.log(result);
            res.status(200).json(result);
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Something went wrong' });
        }
    }

    else {
		res.setHeader('Allow', ['POST'])
		res
			.status(405)
			.json({ message: `HTTP method ${req.method} is not supported.` })
	}
    
}