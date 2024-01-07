<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Session;

class SessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Session::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $currentTime = Carbon::now();
        $session = Session::create([
            'start_time' => $currentTime,
            'winners_stats' => $request->input('winners_stats'),
            'winner_id' => $request->input('winner_id'),
            'is_active' => $request->input('is_active'),
        ]);

        return response()->json($session, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Session::where('session_id', $id)->first();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $requestdata = $request->all(); 

        $requestdata['updated_at'] = date('Y-m-d');

         $session= Session::where('session_id',$id)->update($requestdata);

        if ($session) {

            return 'true';

        }else{

            return 'false';

        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Session::destroy($id);
    }
}
