import { Anvil } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {getAuthSession} from '@/lib/auth';
import SignOut from "./signout";

export default async function Navbar(){
    const session=await getAuthSession()
    console.log(session);
    const tempUser={
        name:"pragati",
        username:'pragati'
        }
    // const [isModalOpen,setIsModalOpen]=useState(false);
    return(
        <div className="w-full flex justify-between items-center px-8 h-12">
            <Link href='/' className="flex gap-2">
            <Anvil/>
          <span className="font-extrabold">CMS</span> 
            </Link>
            {session ? 
            <UserModelCompo user={(session?.user)} />
            :
            <Link href='/sign-in'>
                Sign in
            </Link>} 
        </div>
    );
}
const UserModelCompo=({user})=>{
    return (
        <DropdownMenu>
  <DropdownMenuTrigger className="outline-none">
    <Image
    className="rounded-full border-2 border-[greenyellow]"
    alt=""
    src={user.image} width={30} height={30}/>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Hi, {user.name}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
        <Link href={`/profile/${user.username}`}>
        Go to Profile
        </Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
        <SignOut/>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    )
}