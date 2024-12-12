'use client';

interface MenuProps {
    label: String;
    onClick: () => void;
}

const MenuLinks: React.FC<MenuProps> = ({
    label,
    onClick
}) => {
    return (
        <div
            onClick={onClick} 
            className="px-5 py-4 hover:bg-slate-500 hover:rounded-lg"
        >
            {label}
        </div>
    )
}

export default MenuLinks;