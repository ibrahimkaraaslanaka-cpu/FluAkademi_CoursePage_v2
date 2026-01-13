"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Gift, CreditCard } from "lucide-react";

interface CourseSidebarProps {
    title: string;
    price: number;
    originalPrice: number;
    discount: number;
    image?: string;
}

export default function CourseSidebar({
    title,
    price,
    originalPrice,
    discount,
    image,
}: CourseSidebarProps) {
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="sticky top-28"
        >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Course Title */}
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                </div>

                {/* Course Image - 16:9 */}
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center text-gray-400">
                                <svg
                                    className="w-12 h-12 mx-auto mb-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <p className="text-xs">Kurs Görseli</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Price Section */}
                <div className="p-6 bg-gray-50">
                    <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-4xl font-bold text-gray-900">
                            {formatPrice(price)}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                            {formatPrice(originalPrice)}
                        </span>
                    </div>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                        %{discount} indirim
                    </span>
                </div>

                {/* CTA Buttons */}
                <div className="p-6 space-y-3">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gray-900 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                    >
                        <CreditCard className="w-5 h-5" />
                        Hemen Al
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 flex items-center justify-center gap-2 hover:border-gray-900 transition-colors"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Sepete Ekle
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 flex items-center justify-center gap-2 hover:border-gray-900 transition-colors"
                    >
                        <Gift className="w-5 h-5" />
                        Hediye Et
                    </motion.button>
                </div>

                {/* Features */}
                <div className="px-6 pb-6">
                    <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span>Ömür boyu erişim</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span>Mobil uyumlu</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span>Sertifika</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
