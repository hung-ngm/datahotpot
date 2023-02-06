import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { Layout } from '../src/components/layout';
import { Issue } from '../src/components/templates/issue';
import { useSession, getSession } from "next-auth/react";
import {prisma} from '../lib/prismadb';
import { TIssue } from '../types/issue';

// export const getServersideProps: GetServerSideProps = async ({req, res}) => {
//     const session = await getSession({ req });
//     if (!session) {
//         res.statusCode = 403;
//         return { props: { issues: [] } };
//     }

//     const issues = await prisma.issue.findMany();
//     return {
//         props: { issues: JSON.parse(JSON.stringify(issues)) },
//     }
// }

// type TIssues = {
//     props: Array<TIssue>
// }

const IssuePage: NextPage = () => {
    const { data: session } = useSession();

    if (session?.user) {
        return (
            <Layout>
                <Issue
                    //issues = {props.issues}
                />
            </Layout>
        );
    }

    return (
        <Layout>
            <p>Not logged in</p>
        </Layout>
    )
};

export default IssuePage;