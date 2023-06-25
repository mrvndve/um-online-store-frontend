import { 
  Table, 
  ConfirmationDialog,
  TextField,
  SelectField,
  Button,
  Modal,
} from '../../../components';

import useDeliveries from '../../../hooks/use-deliveries';

const DeliveriesPage = () => {

const {
  loading,
  rows,
  tableRowsHeaders,
  tableHeaderActions,
  selected,
  setSelected,
  setSearchBy,
  setSearch,
  fetchData,
  dialog,

  driverModalOpen,
  handleCloseDriverModal,
  drivers,
  handleSubmitAssignDriver,
  setDriverId,
} = useDeliveries();

return <>
  <div>
    <Table {...{
      loading,
      rows,
      tableRowsHeaders,
      tableHeaderActions,
      selected,
      setSelected,
      fetchData,
      filterComponent: (
        <div className='row g-3'>
          <div className='col-12'>
            <SelectField
              name='search_by'
              label='Search By'
              options={tableHeaderActions.filterByOptions.map(data => ({
                label: data.label,
                value: data.value,
              }))}
              onChange={e => setSearchBy(e.target.value)}
              defaultValue={tableHeaderActions.filterByOptions[0]['value']}
            />
          </div>
    
          <div className='col-12'>
            <TextField
              name='search'
              label='Search'
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className='col-12'>
            <Button
              type='submit'
              label='Search'
              style={{ width: '100%' }}
              onClick={() => {
                fetchData();
                setSearch('');
              }}
            />
          </div>
        </div>
      ),
    }}/>

    <ConfirmationDialog {...{
      open: dialog.open,
      onClose: dialog.onClose,
      title: dialog.title,
      message: dialog.message,
      onConfirm: dialog.onConfirm,
    }}/>

    <Modal {...{
      isOpen: driverModalOpen,
      title: 'Assign Driver',
      handleClose: handleCloseDriverModal,
    }}
    >
      <div className='row g-4'>
        <div className='col-12'>
          <SelectField
            label='Driver'
            options={drivers.map(data => ({
              label: data.fullName,
              value: data.id,
            }))}
            onChange={(e) => setDriverId(e.target.value)}
          />
        </div>

        <div className='col-12'>
          <Button
            label='Submit'
            style={{ width: '100%' }}
            onClick={() => handleSubmitAssignDriver()}
          />
        </div>
      </div>
    </Modal>
  </div>
</>
};

export default DeliveriesPage;