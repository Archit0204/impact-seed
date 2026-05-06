"use client"
import { useState } from "react";
import { X, Heart, Eye, EyeOff, MessageSquare } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

type DonationModalProps = {
    campaignId: string;
    campaignName: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
};

const presetAmounts = [10, 25, 50, 100, 250, 500];

export default function DonationModal({ campaignId, campaignName, isOpen, onClose, onSuccess }: DonationModalProps) {
    const [amount, setAmount] = useState<string>("");
    const [anonymous, setAnonymous] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleDonate = async () => {
        const donationAmount = parseFloat(amount);
        if (!donationAmount || donationAmount <= 0) {
            toast.error("Please enter a valid donation amount");
            return;
        }

        setLoading(true);
        try {
            await axios.post('/api/donations', {
                amount: donationAmount,
                campaignId,
                anonymous,
                message: message || undefined,
            });
            toast.success(`Thank you for donating $${donationAmount}!`);
            onSuccess?.();
            onClose();
            setAmount("");
            setMessage("");
            setAnonymous(false);
        } catch (error: any) {
            const msg = error.response?.data?.message || "Failed to process donation";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            
            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md animate-scale-in overflow-hidden">
                {/* Header */}
                <div className="gradient-primary px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Make a Donation</h3>
                            <p className="text-xs text-white/80 truncate max-w-[200px]">{campaignName}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors">
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                <div className="p-6 flex flex-col gap-5">
                    {/* Preset amounts */}
                    <div>
                        <label className="text-sm font-semibold text-slate-700 mb-2 block">Select Amount</label>
                        <div className="grid grid-cols-3 gap-2">
                            {presetAmounts.map(preset => (
                                <button
                                    key={preset}
                                    onClick={() => setAmount(preset.toString())}
                                    className={`py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                                        amount === preset.toString()
                                            ? "gradient-primary text-white shadow-lg shadow-emerald-200"
                                            : "bg-slate-50 text-slate-700 border border-slate-200 hover:border-emerald-300"
                                    }`}
                                >
                                    ${preset}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Custom amount */}
                    <div>
                        <label className="text-sm font-semibold text-slate-700 mb-2 block">Custom Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full py-3.5 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
                            />
                        </div>
                    </div>

                    {/* Anonymous toggle */}
                    <button
                        onClick={() => setAnonymous(!anonymous)}
                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                            anonymous 
                                ? "border-emerald-300 bg-emerald-50" 
                                : "border-slate-200 bg-slate-50 hover:border-slate-300"
                        }`}
                    >
                        {anonymous ? (
                            <EyeOff className="w-5 h-5 text-emerald-600" />
                        ) : (
                            <Eye className="w-5 h-5 text-slate-400" />
                        )}
                        <div className="text-left">
                            <span className={`text-sm font-semibold ${anonymous ? "text-emerald-700" : "text-slate-700"}`}>
                                Donate Anonymously
                            </span>
                            <p className="text-xs text-slate-400">Your name won&apos;t be shown publicly</p>
                        </div>
                    </button>

                    {/* Message */}
                    <div>
                        <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Message (Optional)
                        </label>
                        <textarea
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Leave an encouraging message..."
                            rows={2}
                            maxLength={500}
                            className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 resize-none transition-all"
                        />
                    </div>

                    {/* Donate button */}
                    <button
                        onClick={handleDonate}
                        disabled={loading || !amount}
                        className="w-full py-4 rounded-xl gradient-accent text-white text-base font-bold hover:opacity-90 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Heart className="w-5 h-5" />
                                Donate {amount ? `$${parseFloat(amount).toLocaleString()}` : ""}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
