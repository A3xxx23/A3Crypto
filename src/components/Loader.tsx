import { IconLoader } from "@tabler/icons-react"

export const Loader = () => {
  return (
    <div className="flex justify-center items-center py-60">
        <IconLoader
          className="animate-spin text-shadow-black"
          size={48}
          stroke={2}
        />
      
    </div>
  )
}

export default Loader
