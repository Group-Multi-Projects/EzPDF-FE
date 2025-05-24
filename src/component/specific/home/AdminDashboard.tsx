import EventChart from '@/component/atoms/chart/EventChart'
import TotalChart from '@/component/atoms/chart/TotalChart'
import React from 'react'

const AdminDashboard = () => {
  return (
    <div className='flex flex-col  lg:justify-between gap-4 '>
        <div className="w-full h-[50vh] border rounded-xl shadow-lg p-3 bg-white">
          <EventChart/>
        </div>
        <div className="w-full h-[50vh] border rounded-xl shadow-lg p-3 bg-white">
          <TotalChart/>
        </div>

    </div>
  )
}

export default AdminDashboard
