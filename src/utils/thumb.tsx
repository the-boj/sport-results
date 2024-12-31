interface Props {
    image: string
}
function Thumb({ image }: Props) {
    return <img alt="thumbnail" className="w-[20px] h-[20px] mr-[4px] object-contain" src={image} />
}

export { Thumb };