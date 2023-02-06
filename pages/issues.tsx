import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { Layout } from '../src/components/layout';
import { Issues } from '../src/components/templates/issues';
import { useSession, getSession } from "next-auth/react";
import {prisma} from '../lib/prismadb';
import { TIssues } from '../src/components/templates/issues/types';

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const session = await getSession({ req });
    if (!session) {
        res.statusCode = 403;
        return { props: { issues: [] } };
    }

    const issues = await prisma.issue.findMany({
        include: {
            categories: true
        }
    });

    return {
        props: { issues: JSON.parse(JSON.stringify(issues)) },
    }
}

const IssuePage: NextPage<TIssues> = ({ issues }) => {
    const { data: session } = useSession();

    if (session?.user) {
        return (
            <Layout>
                <Issues
                    issues = {issues}
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