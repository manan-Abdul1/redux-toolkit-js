import { RotatingLines } from 'react-loader-spinner'

const Loader = () => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>

                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="60"
                    visible={true}
                />
            </div>
        </>
    )
}

export default Loader