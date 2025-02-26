import { FaFacebookF, FaInstagram  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {

    return (
        <div className="flex justify-between items-center p-8 bg-customLightGray">
            <div className="flex flex-col gap-y-3">
                <h3 className="text-xl font-medium">Contact Us</h3>
                <div className="flex flex-col text-sm">
                    <p>Chitkara University, Rajpura</p>
                    <p>123-456-789</p>
                </div>
            </div>
            <div className="flex flex-col gap-y-3">
                <h3 className="text-xl font-medium">Follow Us</h3>
                <div className="flex justify-between text-lg">
                    <button><FaFacebookF/></button>
                    <button><FaXTwitter/></button>
                    <button><FaInstagram/></button>
                </div>
            </div>
        </div>
    )

}