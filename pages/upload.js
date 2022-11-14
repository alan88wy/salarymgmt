import UploadCSV from '../components/uploadCSV'

import { server } from '../config/index'

export default function Home() {
    return (
      <div>
        <UploadCSV />
      </div>
    )
}