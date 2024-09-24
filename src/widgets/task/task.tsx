import { ComponentPropsWithoutRef, FC, Fragment } from 'react';

import { cn } from '@/shared/lib/tw-merge';
import {
    CodeExample,
    DescriptionData,
    Image as ImageType,
    Paragraph as ParagraphType,
    Task as TaskType,
    TaskFile,
} from '@/shared/types';

type Props = ComponentPropsWithoutRef<'div'> & {
    index?: number;
    taskData: TaskType;
    answerField?: React.ReactNode;
};

const Paragraph: FC<
    ComponentPropsWithoutRef<'p'> & { data: ParagraphType }
> = ({ className, data }) => {
    return (
        <p className={cn('text-justify text-sm', className)}>
            {data.children.map((textItem, index) => {
                if ('bold' in textItem && textItem.bold) {
                    return (
                        <span
                            className="font-semibold"
                            key={`p${index}-t${index}`}>
                            {textItem.text}
                        </span>
                    );
                }
                return (
                    <span className="font-normal" key={`p${index}-t${index}`}>
                        {textItem.text}
                    </span>
                );
            })}
        </p>
    );
};

const CodeBlock: FC<ComponentPropsWithoutRef<'p'> & { data: CodeExample }> = ({
    className,
    data,
}) => {
    return (
        <pre className={cn('w-full whitespace-break-spaces py-4', className)}>
            <code className="block w-full rounded-md bg-gray-800 p-6 text-sm text-white">
                {data.children.map((item, index) => (
                    <Fragment key={index}>
                        {item.text} <br />
                    </Fragment>
                ))}
            </code>
        </pre>
    );
};

const Picture: FC<ComponentPropsWithoutRef<'div'> & { data: ImageType }> = ({
    data,
    className,
}) => {
    return (
        <div className={cn('flex w-full justify-center py-4', className)}>
            <img
                src={data.image.url}
                alt={data.image.alternativeText || ''}
                className="block max-h-80 max-w-full md:max-w-96"
            />
        </div>
    );
};

const DescriptionBlock: FC<
    ComponentPropsWithoutRef<'div'> & {
        data: DescriptionData;
    }
> = (props) => {
    const { data, className } = props;
    return (
        <div className={cn('flex w-full flex-col items-center', className)}>
            <div className=" w-full md:px-10">
                {data?.map((item, index) => {
                    switch (item.type) {
                        case 'image': {
                            return <Picture key={`img${index}`} data={item} />;
                        }
                        case 'paragraph': {
                            return <Paragraph key={`p${index}`} data={item} />;
                        }
                        default: {
                            return (
                                <CodeBlock key={`code${index}`} data={item} />
                            );
                        }
                    }
                })}
            </div>
        </div>
    );
};

const FileLink: FC<
    ComponentPropsWithoutRef<'div'> & {
        data: TaskFile;
    }
> = (props) => {
    const { data, className } = props;
    return (
        <div className={cn('py-4 md:pl-10', className)}>
            <p className="text-sm font-semibold">
                Прикрепленный файл:{' '}
                <a
                    href={data.url}
                    target="_blank"
                    className="font-normal text-blue-500 underline">
                    скачать по ссылке
                </a>
            </p>
        </div>
    );
};

export const Task: FC<Props> = (props) => {
    const { taskData, answerField, className, index } = props;
    const { AnswerDescription, Description, file, Answer } = taskData;

    return (
        <div className={cn('flex w-full flex-col items-center', className)}>
            <div className=" flex flex-col items-center gap-2 md:px-10">
                {Description && (
                    <div className="flex w-full flex-col gap-2">
                        {index && (
                            <p className="text-base font-bold md:pl-10">
                                №{index} <br />
                                Тип: {taskData.examPosition}
                                <span className="pl-2 text-sm font-light text-gray-500">
                                    ID{taskData.id}
                                </span>
                            </p>
                        )}
                        <p className="font-semibold md:pl-10">Условие:</p>
                        <DescriptionBlock data={Description} />
                    </div>
                )}

                {file && (
                    <div className="w-full">
                        <FileLink data={file} />
                    </div>
                )}

                {answerField && (
                    <div className="flex w-full flex-col items-start gap-2 md:pl-10">
                        <p className="block font-semibold">Ответ:</p>
                        <div className="w-full">{answerField}</div>
                    </div>
                )}

                {AnswerDescription && (
                    <div className="flex w-full flex-col items-start gap-2">
                        <div className="w-full">
                            <p className="pb-1 font-semibold md:pl-10">
                                Решение:
                            </p>
                            <hr className="w-full" />
                        </div>
                        <DescriptionBlock data={AnswerDescription} />
                    </div>
                )}

                {Answer && (
                    <div className="w-full md:pl-10">
                        <p>
                            Ответ:{' '}
                            <span className="font-semibold">{Answer}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
