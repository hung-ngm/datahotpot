import { useState, useEffect } from 'react';
import { TNFTItem } from '../../types/NFTItem';
import { getDataUrl } from '../../pages/api/contracts/getDataUrl'

const useDataUrl = (item: TNFTItem) => {
    const [dataUrl, setDataUrl] = useState<string>("")

    const getDatasetUrl = async (item: TNFTItem) => {
        const dataUrl = await getDataUrl(item);
        console.log('dataUrl', dataUrl);
        if (dataUrl) {
          setDataUrl(dataUrl);
        }
      }

    useEffect(() => {
        if (dataUrl) {
          console.log('dataUrl', dataUrl)
          return;
        }
        getDatasetUrl(item);
    }, [dataUrl])

    return dataUrl;
}

export default useDataUrl;