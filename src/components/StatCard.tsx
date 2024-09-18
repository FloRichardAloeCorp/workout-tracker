import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import * as React from 'react';

export interface IStatCardProps {
    title: string;
    stat: string;
    icon: React.ReactNode;
}

export function StatCard(props: IStatCardProps) {
    return (
        <Card className='w-[40%] bg-[#77d8f7]'>
            <CardHeader className='text-sm'>{props.icon}</CardHeader>
            <CardBody className='text-3xl font-bold'>{props.stat}</CardBody>
            <CardFooter className='text-sm pt-0'>{props.title}</CardFooter>
        </Card>
    );
}
