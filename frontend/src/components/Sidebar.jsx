import {
    LayoutDashboard,
    Globe,
    Inbox,
    Settings,
    FileText,
    ChevronDown,
    ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Globe, label: 'Nexus' },
    { icon: Inbox, label: 'Intake' },
    {
        icon: Settings,
        label: 'Services',
        submenu: [
            { label: 'Pre-active' },
            { label: 'Active' },
            { label: 'Blocked' },
            { label: 'Closed' },
        ]
    },
    {
        icon: FileText,
        label: 'Invoices',
        submenu: [
            { label: 'Proforma Invoices' },
            { label: 'Final Invoices' },
        ]
    },
];

export default function Sidebar() {
    const [openMenu, setOpenMenu] = useState('');

    const toggleMenu = (label) => {
        setOpenMenu(openMenu === label ? '' : label);
    };

    return (
        <aside className="w-56 min-h-screen bg-sidebar-dark text-white flex flex-col">
            {/* Logo / Header */}
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">V</span>
                    </div>
                    <div>
                        <h1 className="font-semibold text-sm">Vault</h1>
                        <p className="text-xs text-gray-400">Anurag Yadav</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4">
                {menuItems.map((item) => (
                    <div key={item.label}>
                        <button
                            onClick={() => item.submenu && toggleMenu(item.label)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-sidebar-hover transition-colors ${item.active ? 'bg-sidebar-hover text-white' : 'text-gray-400'
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                            {item.submenu && (
                                <span className="ml-auto">
                                    {openMenu === item.label ? (
                                        <ChevronDown className="w-4 h-4" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4" />
                                    )}
                                </span>
                            )}
                        </button>

                        {/* Submenu */}
                        {item.submenu && openMenu === item.label && (
                            <div className="pl-11 py-1">
                                {item.submenu.map((subItem) => (
                                    <button
                                        key={subItem.label}
                                        className="w-full text-left py-2 px-4 text-sm text-gray-400 hover:text-white hover:bg-sidebar-hover transition-colors"
                                    >
                                        {subItem.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
}
