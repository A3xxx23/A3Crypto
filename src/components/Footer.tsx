import { SocialLinks } from "../constants/links";

export const Footer = () => {
    return (
        <div className="flex justify-center items-center w-full text-white">
            <footer className="text-center flex flex-col items-center w-full py-4"> 
                <p>&copy; {new Date().getFullYear()} | created by Angel Aquino</p>
                <div className="flex gap-0 justify-center">
                    {SocialLinks.map((link) => (
                        <a 
                            key={link.id} 
                            href={link.href} 
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-gray-500 w-10 h-10 flex items-center justify-center rounded-full transition-all"
                        >
                            <link.icon className="w-6 h-6" />
                        </a>
                    ))}
                </div>
            </footer>
        </div>
    );
}
