import Rest from '../utils/rest'

const baseURL = 'https://mymoney-2fcaf-default-rtdb.firebaseio.com/'
const {useGet, usePost, useDelete, usePatch} = Rest(baseURL)

const useMesAPI = data =>{

  const infoMes = useGet(`meses/${data}`)
  const [patchMesData, alterarMes] = usePatch(`meses/${data}`,)

  return {infoMes, alterarMes}
}
const useMovimentacoesAPI = data =>{
  const movimentacoes = useGet(`movimentacoes/${data}`)
  const [postData, salvarNovaMovimentacao] = usePost(`movimentacoes/${data}`)
  const [deleteData, removerMovimentacao] = useDelete()

  return {movimentacoes, salvarNovaMovimentacao, removerMovimentacao}
}

export {useMesAPI, useMovimentacoesAPI}